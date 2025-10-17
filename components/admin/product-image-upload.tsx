'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
// import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { R2Image } from '@/components/ui/r2-image';

interface ProductImageUploadProps {
  onImageUploaded?: (imageData: ProductImageData) => void;
  onError?: (error: string) => void;
}

interface ProductImageData {
  id: string;
  name: string;
  category: string;
  description: string;
  imagePath: string;
  imageUrl: string;
  uploadedAt: Date;
  status: 'uploading' | 'success' | 'error';
}

interface UploadProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export function ProductImageUpload({ onImageUploaded, onError }: ProductImageUploadProps) {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [uploadedImages, setUploadedImages] = useState<ProductImageData[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    'hero',
    'product',
    'brand',
    'certification',
    'social',
    'icon',
    'other'
  ];

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      onError?.('Some files are not images and were filtered out');
    }
    
    setSelectedFiles(prev => [...prev, ...imageFiles]);
  }, [onError]);

  const removeFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const generateImagePath = useCallback((fileName: string, category: string) => {
    const timestamp = Date.now();
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
    const extension = sanitizedName.split('.').pop();
    const nameWithoutExt = sanitizedName.replace(/\.[^/.]+$/, '');
    
    return `${category}/${nameWithoutExt}-${timestamp}.${extension}`;
  }, []);

  const uploadImageToR2 = async (file: File, imagePath: string): Promise<{ success: boolean; url?: string; error?: string }> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', imagePath);
      formData.append('category', productCategory);
      formData.append('name', productName);
      
      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      return { success: true, url: result.url };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  };

  const handleUpload = async () => {
    if (!productName || !productCategory || selectedFiles.length === 0) {
      onError?.('Please fill in all required fields and select at least one image');
      return;
    }

    setIsUploading(true);
    setUploadProgress([]);

    const newProgress: UploadProgress[] = selectedFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading'
    }));
    setUploadProgress(newProgress);

    const uploadedImages: ProductImageData[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const imagePath = generateImagePath(file.name, productCategory);
      
      try {
        // Simulate progress updates
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(prev => prev.map((p, idx) => 
            idx === i ? { ...p, progress } : p
          ));
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        const result = await uploadImageToR2(file, imagePath);
        
        if (result.success) {
          const imageData: ProductImageData = {
            id: `img-${Date.now()}-${i}`,
            name: productName,
            category: productCategory,
            description: productDescription,
            imagePath,
            imageUrl: result.url!,
            uploadedAt: new Date(),
            status: 'success'
          };
          
          uploadedImages.push(imageData);
          
          setUploadProgress(prev => prev.map((p, idx) => 
            idx === i ? { ...p, status: 'success' as const } : p
          ));
        } else {
          setUploadProgress(prev => prev.map((p, idx) => 
            idx === i ? { ...p, status: 'error' as const, error: result.error } : p
          ));
        }
      } catch (error) {
        setUploadProgress(prev => prev.map((p, idx) => 
          idx === i ? { 
            ...p, 
            status: 'error' as const, 
            error: error instanceof Error ? error.message : 'Unknown error' 
          } : p
        ));
      }
    }

    setUploadedImages(prev => [...prev, ...uploadedImages]);
    setIsUploading(false);
    
    if (uploadedImages.length > 0) {
      onImageUploaded?.(uploadedImages[0]);
    }
  };

  const resetForm = () => {
    setProductName('');
    setProductCategory('');
    setProductDescription('');
    setSelectedFiles([]);
    setUploadProgress([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Product Image Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Product Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="productCategory">Category *</Label>
              <Select value={productCategory} onValueChange={setProductCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productDescription">Description</Label>
            <Textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter product description"
              rows={3}
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="fileInput">Images *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                id="fileInput"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Click to upload images or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP, GIF up to 10MB each
                </p>
              </label>
            </div>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files ({selectedFiles.length})</Label>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {uploadProgress.length > 0 && (
            <div className="space-y-2">
              <Label>Upload Progress</Label>
              {uploadProgress.map((progress, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{progress.file.name}</span>
                    <span className="flex items-center gap-1">
                      {progress.status === 'uploading' && (
                        <span className="text-blue-600">Uploading...</span>
                      )}
                      {progress.status === 'success' && (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                      {progress.status === 'error' && (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </span>
                  </div>
                  <Progress value={progress.progress} className="h-2" />
                  {progress.error && (
                    <p className="text-xs text-red-600">{progress.error}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleUpload}
              disabled={isUploading || !productName || !productCategory || selectedFiles.length === 0}
              className="flex-1"
            >
              {isUploading ? 'Uploading...' : 'Upload Images'}
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedImages.map((image) => (
                <div key={image.id} className="border rounded-lg p-4 space-y-2">
                  <div className="aspect-video bg-gray-100 rounded overflow-hidden">
                    <R2Image
                      src={image.imagePath}
                      alt={image.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{image.name}</p>
                    <p className="text-xs text-gray-500">{image.category}</p>
                    <p className="text-xs text-gray-500">
                      {image.uploadedAt.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
