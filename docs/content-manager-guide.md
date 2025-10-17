# Content Manager Guide: R2 Image Management

## Overview

This guide provides content managers with comprehensive instructions for managing product images using the R2 image system. Content managers can add new products, update existing images, and manage the image library without requiring developer assistance.

## Getting Started

### Prerequisites
- Access to the content management interface
- Basic understanding of image formats and sizes
- Familiarity with product information structure

### Supported Image Formats
- **WebP** (Recommended) - Best compression and quality
- **JPG/JPEG** - Good for photographs
- **PNG** - Good for graphics with transparency
- **GIF** - For animated content

### Image Size Guidelines
- **Hero Images**: 1920x1080px (16:9 ratio)
- **Product Thumbnails**: 300x300px (1:1 ratio)
- **Detail Images**: 800x600px (4:3 ratio)
- **Gallery Images**: 600x400px (3:2 ratio)

## Content Management Interface

### Adding New Products

#### Step 1: Product Information
1. **Product Name**: Enter the product name in both Chinese and English
2. **Category**: Select from predefined categories:
   - `hero` - Hero carousel images
   - `product` - Product showcase images
   - `brand` - Brand assets and logos
   - `certification` - Certification images
   - `social` - Social media assets
   - `icon` - UI icons and graphics
   - `other` - Miscellaneous images

3. **Description**: Provide a detailed product description
4. **Specifications**: Include weight, packaging, shelf life, and storage requirements

#### Step 2: Image Upload
1. **Select Images**: Choose multiple images for different use cases
2. **Image Naming**: The system automatically generates standardized names
3. **Upload Process**: Images are uploaded to R2 bucket with proper organization
4. **Verification**: Confirm images are accessible and display correctly

#### Step 3: Image Organization
- **Main Image**: Primary product image for listings
- **Hero Image**: Large image for carousel displays
- **Thumbnail**: Small image for product grids
- **Detail Images**: Additional images for product pages

### Image Naming Convention

The system automatically generates standardized image names based on:

```
{category}/{product-name}-{variant}-{size}-{quality}-{timestamp}.{extension}
```

#### Examples:
- `product/spicy-shrimp-balls-hero-1920x1080-high-1703123456789.webp`
- `product/spicy-shrimp-balls-thumbnail-300x300-medium-1703123456789.webp`
- `carousel1/spicy-shrimp-balls-main-1920x1080-high-1703123456789.webp`

### Image Variants

#### Product Images
- **Hero**: Large display image (1920x1080px)
- **Thumbnail**: Grid listing image (300x300px)
- **Detail**: Product page image (800x600px)
- **Gallery**: Additional showcase images (600x400px)

#### Carousel Images
- **Main**: Primary carousel image (1920x1080px)
- **Floating**: Decorative floating image (400x400px)
- **Background**: Background carousel image (1920x1080px)

## Best Practices

### Image Quality
- **Resolution**: Use high-resolution images for best quality
- **Compression**: Optimize file sizes without losing quality
- **Format**: Prefer WebP format for better compression
- **Aspect Ratio**: Maintain consistent aspect ratios

### Content Guidelines
- **Product Names**: Use clear, descriptive names
- **Categories**: Choose appropriate categories for organization
- **Descriptions**: Provide detailed, accurate descriptions
- **Specifications**: Include all relevant product details

### Image Management
- **Regular Updates**: Keep images current and relevant
- **Version Control**: Use timestamps for image versions
- **Backup**: Maintain backups of important images
- **Testing**: Verify images display correctly after upload

## Workflow Examples

### Example 1: Adding a New Product

#### Scenario: Adding "麻辣虾球" (Spicy Shrimp Balls)

1. **Product Information**:
   - Name: "麻辣虾球"
   - English Name: "Spicy Shrimp Balls"
   - Category: "product"
   - Description: "精选湖北潜江小龙虾尾，浓郁鲜香，Q弹劲爽！"
   - Features: ["液氮速冻", "解冻即食", "无防腐剂"]

2. **Image Upload**:
   - Main Image: `product/spicy-shrimp-balls-hero-1920x1080-high-1703123456789.webp`
   - Thumbnail: `product/spicy-shrimp-balls-thumbnail-300x300-medium-1703123456789.webp`
   - Detail: `product/spicy-shrimp-balls-detail-800x600-high-1703123456789.webp`

3. **Verification**:
   - Check images display correctly
   - Verify product information is accurate
   - Test on different devices and screen sizes

### Example 2: Updating Existing Product

#### Scenario: Updating "麻辣鸭脖" (Spicy Duck Neck) images

1. **Identify Product**: Locate existing product in the system
2. **Prepare New Images**: Ensure new images meet quality standards
3. **Upload Process**: Use the same naming convention
4. **Verification**: Confirm new images replace old ones correctly

### Example 3: Managing Carousel Images

#### Scenario: Adding new hero carousel image

1. **Category Selection**: Choose "hero" category
2. **Image Preparation**: Ensure 1920x1080px resolution
3. **Upload**: System generates appropriate path
4. **Integration**: Image automatically appears in carousel

## Troubleshooting

### Common Issues

#### Image Not Displaying
1. **Check Image Path**: Verify the image path is correct
2. **Check Image Format**: Ensure supported format (WebP, JPG, PNG, GIF)
3. **Check Image Size**: Verify image is not too large
4. **Check R2 Connection**: Ensure R2 bucket is accessible

#### Upload Failures
1. **File Size**: Check if image is too large (max 10MB)
2. **File Format**: Ensure image format is supported
3. **Network**: Check internet connection
4. **Permissions**: Verify user has upload permissions

#### Image Quality Issues
1. **Resolution**: Ensure image has sufficient resolution
2. **Compression**: Check if image is over-compressed
3. **Format**: Try different image format
4. **Aspect Ratio**: Verify correct aspect ratio

### Error Messages

#### "Image too large"
- **Solution**: Reduce image file size or resolution
- **Prevention**: Optimize images before upload

#### "Unsupported format"
- **Solution**: Convert image to supported format
- **Prevention**: Use recommended formats (WebP, JPG, PNG, GIF)

#### "Upload failed"
- **Solution**: Check network connection and try again
- **Prevention**: Ensure stable internet connection

#### "Image not found"
- **Solution**: Verify image path and re-upload
- **Prevention**: Use consistent naming conventions

## Advanced Features

### Batch Operations
- **Multiple Upload**: Upload multiple images at once
- **Batch Naming**: Apply naming conventions to multiple images
- **Batch Organization**: Organize images by category

### Version Control
- **Image Versions**: Track different versions of images
- **Version History**: View previous versions
- **Version Rollback**: Revert to previous versions

### Metadata Management
- **Image Metadata**: Add descriptive information
- **Search Tags**: Add searchable tags
- **Usage Tracking**: Monitor image usage

### Performance Optimization
- **Image Optimization**: Automatic image optimization
- **CDN Distribution**: Global content delivery
- **Cache Management**: Efficient caching strategies

## Training Materials

### Video Tutorials
1. **Getting Started**: Basic interface navigation
2. **Adding Products**: Step-by-step product addition
3. **Image Management**: Image upload and organization
4. **Troubleshooting**: Common issues and solutions

### Documentation
1. **User Manual**: Complete feature documentation
2. **Best Practices**: Guidelines for optimal usage
3. **FAQ**: Frequently asked questions
4. **Support**: Contact information and support channels

### Practice Exercises
1. **Exercise 1**: Add a new product with images
2. **Exercise 2**: Update existing product images
3. **Exercise 3**: Manage carousel images
4. **Exercise 4**: Troubleshoot common issues

## Support and Resources

### Getting Help
- **Documentation**: Comprehensive guides and tutorials
- **Support Team**: Technical support for complex issues
- **Community**: User community for tips and best practices
- **Training**: Regular training sessions and workshops

### Resources
- **Image Guidelines**: Detailed image requirements
- **Naming Conventions**: Standardized naming rules
- **Quality Standards**: Image quality requirements
- **Performance Tips**: Optimization recommendations

### Contact Information
- **Technical Support**: support@juewei.com
- **Training Team**: training@juewei.com
- **Documentation**: docs@juewei.com
- **Emergency Support**: Available 24/7 for critical issues

## Conclusion

The R2 image management system provides content managers with powerful tools for managing product images efficiently. By following these guidelines and best practices, content managers can effectively add, update, and organize images while maintaining optimal performance and user experience.

For additional support or questions, refer to the technical documentation or contact the support team.
