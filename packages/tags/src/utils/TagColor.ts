export class TagColor {
  private cache: Map<string, number> = new Map();

  public get(tag: string) {
    if (!this.cache.has(tag)) {
      this.cache.set(tag, this.generateColor(tag));
    }
    return this.cache.get(tag)!;
  }

  public update(tag: string, color: number) {
    this.cache.set(tag, color);
  }

  private generateColor(tag: string) {
    let numberHash = 0;

    for (let i = 0; i < tag.length; i++) {
      numberHash += (i + 1) * tag.charCodeAt(i);
    }

    return numberHash % 360;
  }
}
