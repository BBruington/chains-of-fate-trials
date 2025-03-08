import Link from "next/link"
import Image from "next/image"
import runes from "../../public/runes-puzzle.png"
import { Button } from "@/components/ui/button"

import { Beaker, Puzzle, Users, Scroll, Sparkles, BookOpen, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 bg-background/80 backdrop-blur-sm p-6 rounded-lg">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Enhance Your D&D Adventures
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Create magical potions and challenging puzzles for your Dungeons & Dragons campaigns with our interactive tools.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="#get-started">
                      Start Your Adventure
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need for Epic Campaigns
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our tools help Dungeon Masters create immersive experiences for their players with minimal preparation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/20 p-4">
                  <Beaker className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Potion Crafting</h3>
                <p className="text-center text-muted-foreground">
                  Mix ingredients to create magical potions with various effects for your campaign.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/20 p-4">
                  <Puzzle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Interactive Puzzles</h3>
                <p className="text-center text-muted-foreground">
                  Challenge your players with puzzles that can be solved collaboratively during sessions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/20 p-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Live Group Play</h3>
                <p className="text-center text-muted-foreground">
                  Run puzzles and activities in real-time with your entire group for an immersive experience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/20 p-4">
                  <Scroll className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Campaign Integration</h3>
                <p className="text-center text-muted-foreground">
                  Seamlessly integrate our tools into your existing D&D 5e campaigns and adventures.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/20 p-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Custom Content</h3>
                <p className="text-center text-muted-foreground">
                  Create and save your own potions, puzzles, and game elements for future sessions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/20 p-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">D&D 5e Compatible</h3>
                <p className="text-center text-muted-foreground">
                  All content follows D&D 5e rules and can be easily adapted to your campaign setting.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="potions" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Brew Magical Concoctions
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our potion crafting system allows players to collect ingredients and combine them to create powerful potions with various effects.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <span>Mix and match over 50 different ingredients</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <span>Discover rare combinations with unique effects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <span>Create potions that align with D&D 5e rules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <span>Save your recipes for future brewing sessions</span>
                  </li>
                </ul>
                <div>
                  <Button asChild>
                    <Link href="/potioncraft">Try Potion Crafting</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[400px] w-[400px] overflow-hidden rounded-lg border shadow-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Potion crafting interface showing ingredients and a cauldron"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="puzzles" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex items-center justify-center order-last lg:order-first">
                <div className="relative h-[275px] w-[400px] overflow-hidden rounded-lg border shadow-lg">
                  <Image
                    src={runes}
                    alt="Interactive puzzle interface showing a rune-based puzzle"
                    fill
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Challenge Your Players
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our puzzle system lets you run interactive challenges during your D&D sessions that players can solve together.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Puzzle className="h-4 w-4 text-primary" />
                    </div>
                    <span>Multiple puzzle types including riddles, runes, and mechanical challenges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Puzzle className="h-4 w-4 text-primary" />
                    </div>
                    <span>Adjustable difficulty levels for any party</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Puzzle className="h-4 w-4 text-primary" />
                    </div>
                    <span>Live mode for group solving during sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Puzzle className="h-4 w-4 text-primary" />
                    </div>
                    <span>Create custom puzzles with your own content</span>
                  </li>
                </ul>
                <div>
                  <Button asChild>
                    <Link href="/puzzlecraft">Try Puzzle Creator</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Loved by Dungeon Masters
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what other DMs are saying about our tools.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                  &quot;The potion crafting system has added a whole new dimension to my campaign. My players love collecting ingredients and experimenting with different combinations.&quot;
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Sarah K.</p>
                    <p className="text-xs text-muted-foreground">Dungeon Master, 3 years</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                  &quot;The puzzle creator has saved me hours of prep time. I can now create engaging puzzles in minutes that my whole group can solve together during our sessions.&quot;
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Michael T.</p>
                    <p className="text-xs text-muted-foreground">Dungeon Master, 2 years</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                  &quot;My players were getting bored with standard combat encounters. These interactive tools have brought new life to our campaign and created memorable moments.&quot;
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Jamie L.</p>
                    <p className="text-xs text-muted-foreground">Dungeon Master, 2 years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Enhance Your D&D Campaign?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of Dungeon Masters using our tools to create unforgettable adventures.
              </p>
            </div>
            <div className="mx-auto flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Button size="lg" asChild>
                <Link href="#signup">
                  Create Free Account
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}