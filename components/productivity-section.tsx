export default function ProductivitySection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Header */}
        <div>
          <h2 className="text-4xl font-bold mb-6">Integrates with your existing stack</h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Monitoring */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-lg p-8 h-64 flex items-center justify-center border border-orange-500/30">
              <div className="text-center">
                <div className="text-5xl mb-4">📊</div>
                <p className="text-sm text-muted-foreground">Monitoring integration</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold">Works with your monitoring tools</h3>
            <p className="text-muted-foreground">
              Native integration with Prometheus, Grafana, Datadog and other industry-standard monitoring platforms.
            </p>
            <p className="font-semibold text-blue-400 hover:text-blue-300 cursor-pointer">Integration guide →</p>
          </div>

          {/* Ticketing */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/10 rounded-lg p-8 h-64 flex items-center justify-center border border-pink-500/30">
              <div className="text-center">
                <div className="text-5xl mb-4">🎫</div>
                <p className="text-sm text-muted-foreground">Ticketing integration</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold">Automate ticketing and escalation</h3>
            <p className="text-muted-foreground">
              Seamless integration with Jira, ServiceNow, and your existing ticketing systems for unified incident
              management.
            </p>
            <p className="font-semibold text-blue-400 hover:text-blue-300 cursor-pointer">Learn more →</p>
          </div>

          {/* Cloud */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-lg p-8 h-64 flex items-center justify-center border border-cyan-500/30">
              <div className="text-center">
                <div className="text-5xl mb-4">☁️</div>
                <p className="text-sm text-muted-foreground">Cloud-native support</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold">Multi-cloud and hybrid deployments</h3>
            <p className="text-muted-foreground">
              Native support for AWS, Azure, GCP and on-premise infrastructure with unified visibility across platforms.
            </p>
            <p className="font-semibold text-blue-400 hover:text-blue-300 cursor-pointer">Explore →</p>
          </div>

          {/* Collaboration */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/10 rounded-lg p-8 h-64 flex items-center justify-center border border-red-500/30">
              <div className="text-center">
                <div className="text-5xl mb-4">💬</div>
                <p className="text-sm text-muted-foreground">Team collaboration</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold">Seamless team communication</h3>
            <p className="text-muted-foreground">
              Integrate with Slack, Microsoft Teams and other platforms for real-time incident notifications and
              coordination.
            </p>
            <p className="font-semibold text-blue-400 hover:text-blue-300 cursor-pointer">View integrations →</p>
          </div>
        </div>
      </div>
    </section>
  )
}
