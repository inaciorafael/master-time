import dayjs from "dayjs"

var that = {
  secondsToTime: (seconds) => new Date(seconds * 1000).toISOString().substring(14, 19),
  secondsToTimeHumanize: (seconds) => dayjs(new Date(seconds * 1000).toISOString()).format('mm[m]:ss[s]'),
}

export default that
