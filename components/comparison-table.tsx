export default function ComparisonTable() {
  return (
    <section id="compare-plans" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-pretty">Find the right plan for you</h2>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
        Compare all features across our SAT NOC plans to find the perfect fit for your infrastructure needs.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-muted">
              <th className="text-left py-4 px-4 font-semibold text-foreground">Features</th>
              <th className="text-center py-4 px-4 font-semibold">
                <div>Lite</div>
                <div className="text-xs font-normal text-muted-foreground mt-1">$79–$89/year</div>
              </th>
              <th className="text-center py-4 px-4 font-semibold">
                <div>Pro ⭐</div>
                <div className="text-xs font-normal text-muted-foreground mt-1">$149–$169/year</div>
              </th>
              <th className="text-center py-4 px-4 font-semibold">
                <div>Ultra</div>
                <div className="text-xs font-normal text-muted-foreground mt-1">$199–$219/year</div>
              </th>
              <th className="text-center py-4 px-4 font-semibold">
                <div>Enterprise</div>
                <div className="text-xs font-normal text-muted-foreground mt-1">Custom</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-muted hover:bg-muted/20 transition">
              <td className="py-4 px-4 font-semibold">24×7 Monitoring</td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
            </tr>
            <tr className="border-b border-muted bg-blue-500/5 hover:bg-blue-500/10 transition">
              <td className="py-4 px-4 font-semibold">Response SLA</td>
              <td className="text-center py-4 px-4 text-foreground">45 min</td>
              <td className="text-center py-4 px-4 text-foreground font-bold">30 min</td>
              <td className="text-center py-4 px-4 text-foreground font-bold">15 min</td>
              <td className="text-center py-4 px-4 text-foreground">Custom</td>
            </tr>
            <tr className="border-b border-muted hover:bg-muted/20 transition">
              <td className="py-4 px-4 font-semibold">Incident Ownership</td>
              <td className="text-center py-4 px-4 text-muted-foreground">—</td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
            </tr>
            <tr className="border-b border-muted hover:bg-muted/20 transition">
              <td className="py-4 px-4 font-semibold">Proactive Problem Management</td>
              <td className="text-center py-4 px-4 text-muted-foreground">—</td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
            </tr>
            <tr className="border-b border-muted hover:bg-muted/20 transition">
              <td className="py-4 px-4 font-semibold">Dedicated Service Governance</td>
              <td className="text-center py-4 px-4 text-muted-foreground">—</td>
              <td className="text-center py-4 px-4 text-muted-foreground">—</td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
            </tr>
            <tr className="border-b border-muted hover:bg-muted/20 transition">
              <td className="py-4 px-4 font-semibold">Custom Dashboards & Reports</td>
              <td className="text-center py-4 px-4 text-muted-foreground">—</td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
            </tr>
            <tr className="border-b border-muted hover:bg-muted/20 transition">
              <td className="py-4 px-4 font-semibold">Automation via Runbooks</td>
              <td className="text-center py-4 px-4 text-muted-foreground">—</td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
            </tr>
            <tr className="border-b border-muted hover:bg-muted/20 transition">
              <td className="py-4 px-4 font-semibold">Named Escalation Manager</td>
              <td className="text-center py-4 px-4 text-muted-foreground">—</td>
              <td className="text-center py-4 px-4 text-muted-foreground">—</td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
            </tr>
            <tr className="hover:bg-muted/20 transition">
              <td className="py-4 px-4 font-semibold">Strategic Guidance & Optimization Roadmap</td>
              <td className="text-center py-4 px-4 text-muted-foreground">—</td>
              <td className="text-center py-4 px-4 text-muted-foreground">—</td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
              <td className="text-center py-4 px-4">
                <span className="text-green-400 text-lg">✓</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground mt-8">
        * Pricing shown is for first year. Standard pricing may vary. Contact sales for volume discounts and enterprise
        solutions.
      </p>
    </section>
  )
}
