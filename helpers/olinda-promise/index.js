import axios from 'axios'
import dateFns from 'date-fns'

import config from '../../config'

const olindaPromise = async date => {
  const quoteDate = date || dateFns.format(new Date(), 'MM-DD-YYYY')
  let quotation = await axios
    .get(
      `${config.olindaApi}/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${quoteDate}'`,
    )
    .then(res => res.data)

  if (quotation.value.length === 0) {
    if (dateFns.getDay(quoteDate) === 0) {
      const datePlusOne = dateFns.addDays(quoteDate, 1)
      quotation = await olindaPromise(dateFns.format(datePlusOne, 'MM-DD-YYYY'))

      return quotation
    }

    if (dateFns.getDay(quoteDate) === 6 || dateFns.getDay(quoteDate) !== 0) {
      const dateLessOne = dateFns.subDays(quoteDate, 1)
      quotation = await olindaPromise(dateFns.format(dateFns.subDays(dateLessOne, 1), 'MM-DD-YYYY'))
      return quotation
    }
  }

  return quotation
}

export default olindaPromise
