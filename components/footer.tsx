import Link from "next/link"
import { R2Image } from "@/components/ui/r2-image"
import { Badge } from "@/components/ui/badge"
import { Instagram, MessageCircle, Phone, MapPin, Mail, Clock, Shield, Star } from "lucide-react"

const footerLinks = {
  navigation: [
    { name: "首页", href: "/" },
    { name: "产品", href: "/products" },
    { name: "关于我们", href: "/about" },
    { name: "联系我们", href: "/contact" },
    { name: "合作下单", href: "/partnership" },
  ],
  social: [
    {
      name: "Instagram",
      handle: "juewei_canada",
      icon: Instagram,
      href: "https://instagram.com/juewei_canada",
      qrCode: "/images/social/juewei_canada_qr.png",
    },
    {
      name: "小红书",
      handle: "绝味鸭脖加拿大",
      icon: MessageCircle,
      href: "https://www.xiaohongshu.com/user/profile/绝味鸭脖加拿大",
      qrCode: "/images/social/xiaohongshu.jpg",
    },
    {
      name: "TikTok",
      handle: "jueweicanada",
      icon: MessageCircle,
      href: "https://tiktok.com/@jueweicanada",
      qrCode: "/images/social/tiktok.png",
    },
    {
      name: "WeChat",
      handle: "JueweiyaboCanada",
      icon: MessageCircle,
      href: "https://weixin.qq.com/r/",
      qrCode: "/images/social/wechat.jpg",
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#fcefea]">
      {/* Single Row Footer */}
      <div className="text-gray-800 py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-black mb-3">联系我们</h2>
                <p className="text-lg text-gray-600">专业团队随时为您服务</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-semibold">(604) 521-7618</div>
                    <div className="text-gray-600 text-sm">Mon-Sun: 9AM-9PM</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-semibold">1531 Derwent Way</div>
                    <div className="text-gray-600 text-sm">Delta, BC V3M6K8</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-semibold">jueweifoodca@gmail.com</div>
                    <div className="text-gray-600 text-sm">24/7 在线支持</div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gray-100 text-gray-700 border-gray-300 px-3 py-1 text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  CFIA认证
                </Badge>
                <Badge className="bg-gray-100 text-gray-700 border-gray-300 px-3 py-1 text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  本地工厂
                </Badge>
                <Badge className="bg-gray-100 text-gray-700 border-gray-300 px-3 py-1 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  新鲜配送
                </Badge>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">快速导航</h3>
              <nav className="space-y-2">
                {footerLinks.navigation.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 py-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Business Hours */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">营业时间</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-800 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800">服务时间</div>
                    <div className="text-sm">周一至周日: 9:00 AM - 9:00 PM</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-800 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800">在线支持</div>
                    <div className="text-sm">24/7 客服支持</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">关注我们</h3>
              <div className="grid grid-cols-2 gap-4">
                {footerLinks.social.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-gray-300"
                    >
                      <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-sm group-hover:shadow-md transition-shadow">
                        <R2Image
                          src={social.qrCode}
                          alt={`${social.name} QR Code`}
                          width={56}
                          height={56}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Icon className="h-4 w-4 text-gray-800" />
                          <div className="font-semibold text-gray-800 text-sm">{social.name}</div>
                        </div>
                        <div className="text-xs text-gray-600">{social.handle}</div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">© 2025 绝味 JUEWEI all right reserved.</p>
        </div>
      </div>
    </footer>
  )
}
