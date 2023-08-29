export default class Person {
    constructor({ id, vehicles, kmTraveled, from, to }){
        this.id = id;
        this.vehicles = vehicles
        this.kmTraveled = kmTraveled
        this.from = from
        this.to = to
    }

    formatted(lang) {
        const mapDate = (d) => {
            const [year, month, day] = d.split('-').map(Number);
            return new Date(year, (month -1), day);
        }
        return {
            id: Number(this.id),
            vehicles: new Intl.ListFormat(lang, { style: 'long', type: 'conjunction' }).format(this.vehicles),
            kmTraveled: new Intl.NumberFormat(lang, { style: "unit", unit: "kilometer" }).format(this.kmTraveled),
            from: new Intl.DateTimeFormat(lang, { month: "long", day: "2-digit", year: "numeric" }).format(mapDate(this.from)),
            to: new Intl.DateTimeFormat(lang, { month: "long", day: "2-digit", year: "numeric" }).format(mapDate(this.to))
        }
    }

    static generateInstanceFromString(text) {
        const EMPTY_SPACE = ' ';
        const [id, vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE);

        return new Person({
            id,
            kmTraveled,
            to,
            from,
            vehicles: vehicles.split(",")
        })
    }
}