const items = [
  { name: "SIGIL TEE", price: "???.??", status: "SOLD OUT", quantity: "0/13" },
  { name: "VOID HOODIE", price: "???.??", status: "COMING SOON", quantity: "?/7" },
  { name: "GLYPH CAP", price: "???.??", status: "LOCKED", quantity: "3/3" },
];

const ClothingShop = () => (
  <section className="py-16 px-4 border-t border-b border-border">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-pixel text-xl md:text-2xl text-primary neon-glow-pink mb-2">
          EXTREMELY LIMITED GOODS
        </h2>
        <p className="font-terminal text-muted-foreground text-lg">
          ╔══════════════════════════════════╗<br />
          ║ &nbsp;IF YOU KNOW, YOU KNOW. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║<br />
          ║ &nbsp;DROPS ARE UNANNOUNCED. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║<br />
          ╚══════════════════════════════════╝
        </p>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-4 font-pixel text-xs text-muted-foreground border-b border-border pb-2">
          <span>ITEM</span>
          <span className="text-center">PRICE</span>
          <span className="text-center">QTY</span>
          <span className="text-right">STATUS</span>
        </div>
        {items.map((item) => (
          <div
            key={item.name}
            className="grid grid-cols-4 gap-4 font-terminal text-lg retro-border p-3 hover:border-primary transition-colors"
          >
            <span className="text-card-foreground">{item.name}</span>
            <span className="text-center text-accent">{item.price}</span>
            <span className="text-center text-muted-foreground">{item.quantity}</span>
            <span className={`text-right ${item.status === "SOLD OUT" ? "text-destructive" : item.status === "LOCKED" ? "text-primary blink" : "text-secondary"}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="font-terminal text-muted-foreground text-sm">
          [ SUBSCRIBE TO THE SIGNAL TO RECEIVE DROP COORDINATES ]
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <input
            type="text"
            placeholder="enter_frequency@..."
            className="bg-muted border border-border text-foreground font-terminal px-4 py-2 w-64 focus:outline-none focus:border-primary"
          />
          <button className="bg-primary text-primary-foreground font-pixel text-xs px-4 py-2 hover:bg-secondary transition-colors">
            TUNE IN
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default ClothingShop;
