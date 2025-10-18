import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/footer'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock R2Image component
jest.mock('@/components/ui/r2-image', () => ({
  R2Image: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  )
}))

// Mock getR2Url function
jest.mock('@/lib/r2/get-r2-url', () => ({
  getR2Url: (path: string) => `https://r2.example.com/${path}`
}))

describe('Footer Component', () => {
  beforeEach(() => {
    // Clear any previous renders
    document.body.innerHTML = ''
  })

  it('renders contact information section', () => {
    render(<Footer />)
    
    expect(screen.getByText('联系我们')).toBeInTheDocument()
    expect(screen.getByText('专业团队随时为您服务')).toBeInTheDocument()
    expect(screen.getByText('(604) 521-7618')).toBeInTheDocument()
    expect(screen.getByText('jueweifoodca@gmail.com')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    
    expect(screen.getByText('快速导航')).toBeInTheDocument()
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('产品')).toBeInTheDocument()
    expect(screen.getByText('关于我们')).toBeInTheDocument()
    expect(screen.getByText('联系我们')).toBeInTheDocument()
    expect(screen.getByText('合作下单')).toBeInTheDocument()
  })

  it('renders business hours section', () => {
    render(<Footer />)
    
    expect(screen.getByText('营业时间')).toBeInTheDocument()
    expect(screen.getByText('服务时间')).toBeInTheDocument()
    expect(screen.getByText('周一至周日: 9:00 AM - 9:00 PM')).toBeInTheDocument()
    expect(screen.getByText('在线支持')).toBeInTheDocument()
    expect(screen.getByText('24/7 客服支持')).toBeInTheDocument()
  })

  it('renders social media section', () => {
    render(<Footer />)
    
    expect(screen.getByText('社交媒体')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('小红书')).toBeInTheDocument()
    expect(screen.getByText('TikTok')).toBeInTheDocument()
    expect(screen.getByText('WeChat')).toBeInTheDocument()
  })

  it('renders trust badges', () => {
    render(<Footer />)
    
    expect(screen.getByText('CFIA认证')).toBeInTheDocument()
    expect(screen.getByText('本地工厂')).toBeInTheDocument()
    expect(screen.getByText('新鲜配送')).toBeInTheDocument()
  })

  it('renders copyright notice', () => {
    render(<Footer />)
    
    expect(screen.getByText('© 2025 绝味 JUEWEI all right reserved.')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveAttribute('aria-label', 'Website footer')
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 2 })
    expect(mainHeading).toHaveTextContent('联系我们')
    
    const subHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(subHeadings).toHaveLength(3) // 快速导航, 营业时间, 社交媒体
    
    // Check navigation accessibility
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Footer navigation')
  })

  it('renders social media QR codes with proper alt text', () => {
    render(<Footer />)
    
    const qrImages = screen.getAllByAltText(/QR Code/)
    expect(qrImages).toHaveLength(4) // Instagram, 小红书, TikTok, WeChat
    
    qrImages.forEach(img => {
      expect(img).toHaveAttribute('src')
      expect(img).toHaveAttribute('alt')
    })
  })

  it('has proper navigation link structure', () => {
    render(<Footer />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    
    // Check that navigation links have proper href attributes
    const homeLink = screen.getByRole('link', { name: '首页' })
    expect(homeLink).toHaveAttribute('href', '/')
    
    const productsLink = screen.getByRole('link', { name: '产品' })
    expect(productsLink).toHaveAttribute('href', '/products')
  })

  it('applies correct CSS classes for styling', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-[#fcefea]')
    
    const mainHeading = screen.getByRole('heading', { level: 2 })
    expect(mainHeading).toHaveClass('text-2xl', 'lg:text-3xl', 'font-black')
  })

  it('renders with proper responsive grid layout', () => {
    render(<Footer />)
    
    const gridContainer = screen.getByRole('contentinfo').querySelector('.grid')
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4')
  })
})
