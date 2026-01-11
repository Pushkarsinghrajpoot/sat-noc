export default function AgentsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-12">
        <h2 className="text-4xl font-bold">Let automation handle the repetitive workload</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Automated remediation */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/10 rounded-lg p-8 h-48 flex items-center justify-center border border-violet-500/30">
              <div className="text-center">
                <div className="text-5xl mb-4">🤖</div>
                <p className="text-sm text-muted-foreground">Intelligent Runbooks</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold">Close tickets faster with automated remediation</h3>
            <p className="text-muted-foreground">
              Runbooks handle routine troubleshooting, restart services, clear temporary files and execute standard
              remediation steps automatically.
            </p>
            <a href="#" className="inline-block font-semibold text-blue-400 hover:text-blue-300">
              Explore automation →
            </a>
          </div>

          {/* Workflow automation */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-lime-500/20 to-green-500/10 rounded-lg p-8 h-48 flex items-center justify-center border border-lime-500/30">
              <div className="text-center">
                <div className="text-5xl mb-4">⚡</div>
                <p className="text-sm text-muted-foreground">Smart Workflows</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold">Reduce escalations with intelligent workflows</h3>
            <p className="text-muted-foreground">
              Automated triage, health inference and action sequencing reduce manual intervention by up to 70% and
              escalation consistency.
            </p>
            <a href="#" className="inline-block font-semibold text-blue-400 hover:text-blue-300">
              Learn more →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
