const Counter = require('./counter')
class Cclass{
    constructor(name,subclass,level,hitdice) {
        this.name = name
        this.subclass = subclass
        this.level = level
        this.hitdice = new Counter(hitdice,level)
    }
}