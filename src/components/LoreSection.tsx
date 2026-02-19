const LoreSection = () => (
  <section id="lore" className="py-16 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="retro-border p-4 mb-8 inline-block">
        <h2 className="font-pixel text-xl text-accent">{">> "}TRANSMISSION_LOG</h2>
      </div>

      <div className="space-y-6 font-terminal text-lg">
        <div className="retro-border p-4 bg-card">
          <p className="text-muted-foreground text-sm mb-1">// LOG_001 — DATE: REDACTED</p>
          <p className="text-foreground">
            The first signal was intercepted on a frequency that shouldn't exist.
            Three receivers confirmed. The origin point mapped to coordinates
            that correspond to no known location.
          </p>
          <p className="easter-egg-text text-sm mt-2">
            coordinates: 33.9425° N, 118.4081° W — but you didn't read this
          </p>
        </div>

        <div className="retro-border p-4 bg-card">
          <p className="text-muted-foreground text-sm mb-1">// LOG_002 — DATE: ████████</p>
          <p className="text-foreground">
            ZINETH is not a brand. ZINETH is a frequency. Those who resonate
            with it will find it. Those who don't were never meant to.
          </p>
        </div>

        <div className="retro-border p-4 bg-card">
          <p className="text-muted-foreground text-sm mb-1">// LOG_003 — DATE: CORRUPTED</p>
          <p className="text-card-foreground">
            The artifacts are not art. They are <span className="text-primary">maps</span>.
            The clothing is not fashion. It is <span className="text-secondary">armor</span>.
            The signal is not sound. It is <span className="text-accent">a key</span>.
          </p>
        </div>

        <div className="text-center text-muted-foreground text-sm mt-8">
          <p>[ MORE LOGS WILL BE DECLASSIFIED AS THE SIGNAL STRENGTHENS ]</p>
          <p className="blink mt-2">▓▓▓ TRANSMISSION INTERRUPTED ▓▓▓</p>
        </div>
      </div>
    </div>
  </section>
);

export default LoreSection;
