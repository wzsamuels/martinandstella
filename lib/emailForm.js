
const DEFAULT_DESTINATION = "martinstellallc@gmail.com"// "martinstellallc@gmail.com"

const emailForm = (subject, formState, destination = "contact@twinsilverdesign.com") => {
  const endpoint =
    "https://87xwju0c87.execute-api.us-east-1.amazonaws.com/default/email-function";

  let bodyObject = {data: formState, destination: destination, subject: subject};
  let body = JSON.stringify(bodyObject)
  console.log(body)

  const requestOptions = {
    method: "POST",
    body
  };

  //console.log(body)

  fetch(endpoint, requestOptions)
    .then((response) => {
      console.log(response)
      if (!response.ok) throw new Error("Error in fetch");
    })
}

export default emailForm