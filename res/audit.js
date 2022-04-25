

function Audit(data) {
    let ABC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    let tableDays = []
    let keys = Object.keys(data)
    let filter = keys.filter(e => e.search('!') === -1)
    function audit(E) {
        let e = E.toLocaleLowerCase()
        let Ab = e.match(/[a-zA-Z]+/g),
            int = e.match(/\d+/g),
            index = int - 4
        return { Ab, int, index }
    }
    filter.map(E => {
        let { int, Ab, index } = audit(E)
        if (int >= 4 && Ab == 'a') tableDays.push({ id: E, purview: data[E].w, doctors: {} })
    })
    tableDays.map(E => {
        let { int, Ab, index } = audit(E.id)
        // console.log(E); 
        let time = ABC.slice(2, 16).map(day => {
            let end = ABC.map((a, i) => a === day ? i : 0)
            end = end.filter((a) => a !== 0)[0] 
            let tody = data[`${day}2`]?.w,
                start = data[`${day}${int}`]?.w
            end = data[`${ABC[end+1]}${int}`]?.w
            if (tody && start && end) return { tody, start, end }
        })
        time = time.filter(a => a !== undefined)
        tableDays[index].doctors = { time: time, doctor: data[`B${int}`]?.w }
    })
    return tableDays
}
module.exports = Audit
//  data Object filter keys !