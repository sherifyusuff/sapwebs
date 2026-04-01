import React from "react"
import Link from "next/link"
import { Cookie, ChevronRight, Info, CheckCircle2, AlertCircle } from "lucide-react"

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium dark:text-white">Cookie Policy</span>
        </nav>

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-primary/10 text-primary rounded-2xl">
            <Cookie className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Cookie Policy</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Learn more about how we use cookies to improve your experience.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 md:p-12 space-y-10">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900/30">
                <Info className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What Are Cookies?</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
              They are widely used to make websites work, or work more efficiently, as well as to provide reporting 
              information to the owners of the site.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg dark:bg-indigo-900/30">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How We Use Cookies</h2>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Essential Cookies</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                  These cookies are necessary for the website to function and cannot be switched off in our systems. 
                  They are usually only set in response to actions made by you which amount to a request for services, 
                  such as setting your privacy preferences, logging in, or filling in forms.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <span className="px-2 py-1 bg-primary/10 rounded-md">Always Required</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Analytics & Performance Cookies</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the 
                  performance of our site. They help us to know which pages are the most and least popular and 
                  see how visitors move around the site.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="px-2 py-1 bg-slate-100 rounded-md dark:bg-slate-800">User Consent Required</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Marketing Cookies</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                  These cookies may be set through our site by our advertising partners. They may be used by those 
                  companies to build a profile of your interests and show you relevant adverts on other sites.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="px-2 py-1 bg-slate-100 rounded-md dark:bg-slate-800">User Consent Required</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg dark:bg-amber-900/30">
                <AlertCircle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Managing Cookies</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              You can control and manage cookies in various ways. Please keep in mind that removing or blocking 
              cookies can impact your user experience and parts of our website may no longer be fully accessible.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Most browsers allow you to change your cookie settings. These settings will typically be found in 
              the 'options' or 'preferences' menu of your browser. You can also use our 
              <span className="font-semibold mx-1">Privacy Dashboard</span> to toggle categories of cookies at any time.
            </p>
          </section>

          <footer className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <p className="text-sm text-slate-500 text-center">
              For more information on how we handle your data, see our <Link href="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
