import Swal from 'sweetalert2'

import theme from '../../theme'

const notification = (type, text, title) => {
  return Swal.fire({
    type,
    title,
    text,
    confirmButtonColor: theme.colors.primary,
  })
}

export default notification
