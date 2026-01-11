export default function LearningSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-12">
        <h2 className="text-4xl font-bold">Real business outcomes, not just alerts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* MTTR */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-lg p-8 h-48 flex items-center justify-center border border-amber-500/30">
              <div className="text-center">
                <div className="text-5xl mb-4">⏱️</div>
                <p className="text-sm text-muted-foreground">MTTR reduction</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold">Significantly reduce mean time to resolution</h3>
            <p className="text-muted-foreground">
              Automated triage, intelligent escalation and dedicated engineers working incidents from detection to fix.
            </p>
          </div>

          {/* Uptime */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/10 rounded-lg p-8 h-48 flex items-center justify-center border border-teal-500/30">
              <div className="text-center">
                <div className="text-5xl mb-4">📈</div>
                <p className="text-sm text-muted-foreground">Uptime improvement</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold">Improve service availability and SLA compliance</h3>
            <p className="text-muted-foreground">
              Proactive monitoring and prevention strategies to keep your infrastructure running reliably and
              consistently.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
