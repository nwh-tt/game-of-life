# Conways Game of Life

https://game-of-life-one-pink.vercel.app/
![image](https://user-images.githubusercontent.com/67919804/174201939-065ac312-2feb-4b95-bf8c-13d90c893e18.png)

If you want to mess with some of the code yourself simply clone the respository, navigate to the game-of-life folder in your file system, and run
npm install.

# How the game works

Conways Game of Life is a simple simulation of life with 4 simple rules

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

![Rules-of-Conways-Game-of-Life](https://user-images.githubusercontent.com/67919804/173730676-220348de-e635-410d-8bd9-1eb3cbdbbf96.png)

These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

- Any live cell with two or three live neighbours survives.
- Any dead cell with three live neighbours becomes a live cell.
- All other live cells die in the next generation. Similarly, all other dead cells stay dead.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules
simultaneously to every cell in the seed, live or dead; births and deaths occur simultaneously, and the discrete moment
at which this happens is sometimes called a tick. Each generation is a pure function of the preceding one. The
rules continue to be applied repeatedly to create further generations.

When stretched out across many generation. there are some really interesting things that can happen. I have compiled a few of my
favorites under the info icon if you are interested.

# How the Website works

Click and drag to make cells come alive. If the cell is filled it is living. Click the step button to go one generation at a time, the play button
will step every n seconods as determined by the speed slider. The x will clear the board.
