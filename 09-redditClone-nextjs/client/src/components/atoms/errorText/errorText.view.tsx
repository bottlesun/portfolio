

type error = {
  error? : string | undefined
}
const ErrorTextView = ({error} : error) => {
  return <small className={'font-medium text-red-500'}>{error}</small>
}
export default ErrorTextView
