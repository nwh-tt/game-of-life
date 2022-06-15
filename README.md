A fully functioning simulation for conways game of life

put link here
put image here

Conways Game of Life is a simple simulation of life with 4 simple rules
  1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  2. Any live cell with two or three live neighbours lives on to the next generation.
  3. Any live cell with more than three live neighbours dies, as if by overpopulation.
  4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  
These rules, which compare the behavior of the automaton to real life, can be condensed into the following:
  - Any live cell with two or three live neighbours survives.
  - Any dead cell with three live neighbours becomes a live cell.
  - All other live cells die in the next generation. Similarly, all other dead cells stay dead.
  
 The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules 
 simultaneously to every cell in the seed, live or dead; births and deaths occur simultaneously, and the discrete moment 
 at which this happens is sometimes called a tick. Each generation is a pure function of the preceding one. The 
 rules continue to be applied repeatedly to create further generations. 
 
 
 The code that is simulating the rules is found in the header file and is explained there with comments.
