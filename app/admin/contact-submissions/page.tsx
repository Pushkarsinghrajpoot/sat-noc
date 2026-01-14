"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { Mail, Phone, Building2, Calendar, Filter, RefreshCw } from "lucide-react"

interface ContactSubmission {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  message: string
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  created_at: string
  updated_at: string
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const url = statusFilter === 'all' 
        ? '/api/contact-us?limit=100'
        : `/api/contact-us?status=${statusFilter}&limit=100`
      
      const response = await fetch(url)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch submissions')
      }

      setSubmissions(result.data || [])
      setError(null)
    } catch (error) {
      console.error('Fetch error:', error)
      setError('Failed to load submissions')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/contact-us', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update status')
      }

      // Refresh the submissions
      fetchSubmissions()
    } catch (error) {
      console.error('Update error:', error)
      alert('Failed to update status')
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <main className="min-h-screen text-foreground">
      <AnimatedBackground />
      <Navigation />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">Contact Submissions</h1>
          <p className="text-gray-300">Manage and track customer inquiries</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-black/40 border border-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          
          <button
            onClick={fetchSubmissions}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-600/10 border border-red-600/20 text-red-400">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-300">Loading submissions...</p>
          </div>
        )}

        {/* Submissions List */}
        {!loading && !error && (
          <div className="space-y-4">
            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300">No contact submissions found</p>
              </div>
            ) : (
              submissions.map((submission) => (
                <div key={submission.id} className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-semibold text-white">{submission.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                          {submission.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-3">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {submission.email}
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {submission.phone}
                          </div>
                        )}
                        {submission.company && (
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {submission.company}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(submission.created_at)}
                        </div>
                      </div>
                      
                      <div className="bg-black/40 rounded-lg p-4">
                        <p className="text-gray-300 whitespace-pre-wrap">{submission.message}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Update Actions */}
                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    {submission.status === 'new' && (
                      <button
                        onClick={() => updateStatus(submission.id, 'in_progress')}
                        className="px-3 py-1 bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 rounded-lg text-sm hover:bg-yellow-600/30 transition"
                      >
                        Mark In Progress
                      </button>
                    )}
                    {submission.status === 'in_progress' && (
                      <button
                        onClick={() => updateStatus(submission.id, 'resolved')}
                        className="px-3 py-1 bg-green-600/20 text-green-400 border border-green-600/30 rounded-lg text-sm hover:bg-green-600/30 transition"
                      >
                        Mark Resolved
                      </button>
                    )}
                    {(submission.status === 'resolved' || submission.status === 'in_progress') && (
                      <button
                        onClick={() => updateStatus(submission.id, 'closed')}
                        className="px-3 py-1 bg-gray-600/20 text-gray-400 border border-gray-600/30 rounded-lg text-sm hover:bg-gray-600/30 transition"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
