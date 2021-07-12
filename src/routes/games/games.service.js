import { query } from '../../utils/db.js'

export function getGameList () {
    return query(`select 
    g.id as 'id',
    g.date as 'start_time', 
    g.end_time as 'end_time', 
    g.front as 'front', 
    g.hole_count as 'hole_count', 
    g.course_id as 'course.id', 
    c.name as 'course.name'
    from games g
    left join courses c on c.id=g.course_id`)
}

export async function getScorecard (gameId) {
    const rows = await query(`select gs.*, cp.par, cp.handicap, g.hole_count, p.name as player_name
    from game_scores gs
    left join games g on g.id=gs.game_id
    left join course_pars cp on cp.course_id=g.course_id and gs.hole_num=cp.hole_num 
    left join players p on p.id=gs.player_id
    where gs.game_id = ?`, [gameId])

    const game = {
        id: rows[0].game_id,
        hole_count: rows[0].hole_count,
        scores: {},
        pars: [],
        handicaps: []
    }

    for (const row of rows) {
        if (!game.scores[row.player_name]) { game.scores[row.player_name] = [] }

        game.scores[row.player_name].push(row.score)

        if (game.pars.length !== game.hole_count) { game.pars.push(row.par) }

        if (game.handicaps.length !== game.hole_count) { game.handicaps.push(row.handicap) }
    }

    return game
}
