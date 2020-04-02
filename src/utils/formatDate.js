import moment from 'moment';

export default date => moment(new Date(date)).format('lll');
