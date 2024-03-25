import moment from 'moment'

/**
 *
 * Return formatted date.
 *
 * @param {datetime} date
 * @param {string } formmat
 * @returns {string}
 */
export const formatDate = (date, format = 'DD-MM-YYYY', inputFormat='YYYY-MM-DDThh:mm:ss.sssssssTZD') => {
    return moment(String(date), inputFormat).format(format)
};
