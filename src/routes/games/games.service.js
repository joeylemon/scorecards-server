import { query } from '../../utils/db.js'

export async function getGameList () {
    const scores = await query(`select 
    gs.game_id as 'game.id', 
    gs.player_id as 'player.id', 
    gs.hole_num as 'hole_num', 
    gs.score as 'score', 
    p.name as 'player.name', 
    g.date as 'game.start_time', 
    g.end_time as 'game.end_time', 
    g.front as 'game.front', 
    g.hole_count as 'game.hole_count', 
    g.course_id as 'course.id', 
    c.name as 'course.name',
    cp.par as 'par'
    from game_scores gs
    left join players p on p.id=gs.player_id
    left join games g on g.id=gs.game_id
    left join courses c on c.id=g.course_id
    left join course_pars cp on cp.course_id=g.course_id and cp.hole_num=gs.hole_num`)

    const games = {}
    for (const score of scores) {
        // Initialize map entry
        if (!games[score.game.id]) {
            games[score.game.id] = {
                players: {}, 
                scores: {}, 
                pars: {}, 
                front: score.game.front === 1,
                course: score.course,
                start_time: score.start_time,
                end_time: score.end_time,
                hole_count: score.hole_count
            }
        }

        games[score.game.id]['players'][score.player.id] = score.player

        if (!games[score.game.id]['scores'][score.player.name]) {
            games[score.game.id]['scores'][score.player.name] = {}
        }

        games[score.game.id]['scores'][score.player.name][score.hole_num] = score.score
        games[score.game.id]['pars'][score.hole_num] = score.par
    }

    return Object.keys(games).map(key => {
        const entry = games[key]
        return {
            id: parseInt(key),
            course: entry.course,
            front: entry.front,
            pars: entry.pars,
            players: Object.keys(entry.players).map(key => entry.players[key]),
            scores: entry.scores,
        }
    })
}
