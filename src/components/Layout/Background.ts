import IBackground from "../../interfaces/IBackground";
import IBackgroundTile from "../../interfaces/IBackgroundTile";
import INavigationItem from "../../interfaces/INavigationItem";
import IPosition from "../../interfaces/IPosition";

import shuttleImg from "../../assets/images/shuttle.png";

const a = (2 * Math.PI) / 6;
const r = 10;

export class Background implements IBackground  {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  tiles: IBackgroundTile[];
  navItems: INavigationItem[];

  constructor(navItems: INavigationItem[]) {
    this.tiles = [];
    this.navItems = navItems;

    if (document.getElementById("background")) {
      this.canvas = document.getElementById("background") as HTMLCanvasElement;
    } else {
      this.canvas = document.createElement("canvas");
      this.canvas.id = "background";
      this.canvas.width = document.documentElement.clientWidth;
      this.canvas.height = document.documentElement.clientHeight;

      window.addEventListener("resize", () => {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.draw();

        // Debug for screen size
        // console.log(this.canvas.width, this.canvas.height);
      });
    }

    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.draw();
  }

  drawGrid(width: number, height: number) {

    if (!this.ctx) return;

    this.ctx.strokeStyle = "#cccccc";
    this.ctx.lineWidth = 0.5;

    for (let i = 0; i < width; i += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, height);
      this.ctx.strokeStyle = "#ff0000";
      this.ctx.stroke();
    }

    for (let i = 0; i < height; i += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(width, i);
      this.ctx.stroke();
    }
  }

  async drawHexagonGrid(width: number, height: number) {
    if (!this.ctx) return;
    
    this.ctx.save();

    this.ctx.strokeStyle = "#cccccc";
    const hexagonHeight = this.calculateHexagonHeight();

    const columns = Math.floor(width / (1.5 * r)) + 2;
    const rows = Math.floor(height / hexagonHeight) + 2;

    for (let i = 0; i < columns; i++) {
      const calcX = (i * (1.5 * r)) - r;
      for (let j = 0; j < rows; j++) {
        const calcY = (j * hexagonHeight) + (i % 2 === 0 ? 0 : (0.5 * hexagonHeight)) - (hexagonHeight / 2);
        const color = '#fffef8' // '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
        
        const tile = this.drawHexagon(calcX, calcY, color);
        if (tile) {
          this.tiles.push(tile);
        }
      }
    }

    this.ctx.restore();
  }

  calculateHexagonHeight(): number {
      if (r <= 0) {
        return 0;
      }
    
      const height =  Math.sqrt(3) * r;
      
      return height;    
  }

  drawHexagon(x: number, y: number, fillStyle?: string): IBackgroundTile | undefined {
    if (!this.ctx) return;
    
    const hexagonHeight = this.calculateHexagonHeight();

    // shift to place at correct position
    const xOffset = x + r;
    const yOffset = y + (0.5 * hexagonHeight);

    const color = fillStyle || "#cccccc"

    const tile: IBackgroundTile = {
      position: {
        x: x,
        y: y,
      },
      color: color,
      width: r * 2,
      height: hexagonHeight,
      path: [],
    } as IBackgroundTile;

    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = "ff0000";

    this.ctx.beginPath();

    for (let i = 0; i < 6; i++) {
      
      const xPos = xOffset + r * Math.cos(a * i);
      const yPos = yOffset + r * Math.sin(a * i);

      this.ctx.lineTo(xPos, yPos);
      tile.path.push({ x: xPos, y: yPos });
    }

    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();

    return tile;
  }

  private mergeTiles(tiles: IBackgroundTile[]): IBackgroundTile[] {

    const mergedTiles: IBackgroundTile[] = [];

    for (let i = 0; i < tiles.length; i++) {

      const tile = tiles[i];

      const existingTile = mergedTiles.find((t) => t.position.x === tile.position.x && t.position.y === tile.position.y);

      if (existingTile) {
        existingTile.path = existingTile.path.concat(tile.path);
      } else {
        mergedTiles.push(tile);
      }
    }

    return mergedTiles;
  }

  private getPerimeterOfTiles(tiles: IBackgroundTile[]): IPosition[] {
    const perimeter: IPosition[] = [];

    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];

      for (let j = 0; j < tile.path.length; j++) {
        const path = tile.path[j];

        if (perimeter.findIndex((p) => p.x === path.x && p.y === path.y) === -1) {
          perimeter.push(path);
        }
      }
    }

    return perimeter;
  }

  private getTilesInArea(origin: IPosition, width: number, height: number): IBackgroundTile[] {
    const tiles: IBackgroundTile[] = [];

    for (let i = 0; i < this.tiles.length; i++) {
      const tile = this.tiles[i];

      let count = 0;
      tile.path.forEach((position) => {
        if (position.x >= origin.x && position.x <= origin.x + width && position.y >= origin.y && position.y <= origin.y + height) {
          count++;
        }
      });

      if (count >= 4) {
        tiles.push(tile);
      }
    }

    return tiles;
  }

  drawNavigationItems() {
    if (!this.ctx) return;

    const local = this;
    const localCTX = this.ctx;

    this.ctx.save();

    const tiles = this.getTilesInArea({ x: 100, y: 100 }, 200, 100);
    for(let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      this.drawHexagon(tile.position.x, tile.position.y, "#ffffff");
    }

    var shuttle = new Image();
    shuttle.src = shuttleImg; 

    shuttle.addEventListener('load', function() {
      // Draw the image on the canvas once it's loaded
      // localCTX.drawImage(shuttle, 100, 100, 200, 100);

      // Define the path for masking
      localCTX.save();
      localCTX.beginPath();
      
      
      const mask = tiles[0];
      for (let i = 0; i < mask.path.length; i++) {
        const path = mask.path[i];
        if (i === 0) {  
          localCTX.moveTo(path.x, path.y);
        }

        localCTX.lineTo(path.x, path.y);
      }
      




      localCTX.closePath();

      // Clip the canvas to the defined path
      localCTX.clip();

      // Clear the canvas
      localCTX.clearRect(100, 100, 200, 100);

      // Redraw the image (now clipped)
      localCTX.drawImage(shuttle, 100, 100, 200, 100);

      localCTX.restore();




    });
    


    for (let i = 0; i < this.navItems.length; i++) {
      const navItem = this.navItems[i];
      const tile = this.tiles[i];

      if (tile) {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(navItem.name, tile.position.x + (tile.width / 2), tile.position.y + (tile.height / 2));
      }

    }

    this.ctx.restore();
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.fillStyle = "#eeeeee";

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawHexagonGrid(this.canvas.width, this.canvas.height);
    // this.drawNavigationItems();

    // this.drawGrid(this.canvas.width, this.canvas.height);
  }
}
