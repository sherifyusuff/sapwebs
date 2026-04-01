import React from "react"
import Link from "next/link"
import { Shield, Lock, Eye, FileText, ChevronRight } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium dark:text-white">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-primary/10 text-primary rounded-2xl">
            <Shield className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Last updated: April 1, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 md:p-12 space-y-10">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900/30">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Introduction</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                At Sapwebs, we are committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, and safeguard your personal information when you visit our website at sapwebs.com. 
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg dark:bg-amber-900/30">
                <Eye className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Information We Collect</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>We collect several different types of information for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Data:</strong> While using our service, we may ask you to provide us with certain personally identifiable information (e.g., name, email address).</li>
                <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used.</li>
                <li><strong>Tracking & Cookies Data:</strong> We use cookies and similar tracking technologies to track the activity on our Service.</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-green-100 text-green-600 rounded-lg dark:bg-green-900/30">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How We Use Your Data</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>Sapwebs uses the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our service.</li>
                <li>To notify you about changes to our service.</li>
                <li>To provide customer support.</li>
                <li>To gather analysis or valuable information so that we can improve our service.</li>
                <li>To monitor the usage of our service.</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg dark:bg-indigo-900/30">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Data Security</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                The security of your data is important to us. We strive to use commercially acceptable means to protect 
                your Personal Data, but remember that no method of transmission over the Internet, or method of 
                electronic storage, is 100% secure.
              </p>
            </div>
          </section>

          <section className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Questions?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-white">Email:</span>
                <a href="mailto:sapwebs2025@gmail.com" className="text-primary hover:underline">sapwebs2025@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-white">Address:</span>
                <span className="text-slate-600 dark:text-slate-400">9 Old Olowora Road, Magodo Isheri Lagos</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
