export default function Footer() {
  return (
    <footer className="bg-card border-t border-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Plans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Compare Plans
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="border-t border-muted pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2026 SAT MicroSystems. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-400 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
