'use client'

import { useState } from "react"
import emailjs from "emailjs-com"

const initialState = {
  name: "",
  email: "",
  message: "",
}

export default function Contact() {
  const [formState, setFormState] = useState(initialState)
  const { name, email, message } = formState

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, message)

    emailjs
      .sendForm(
        "service_tlo07c2",
        "template_hxzzcsj",
        e.target,
        "dboE6WbMLTi_yeBxf"
      )
      .then(
        (result) => {
          console.log(result.text)
          setFormState(initialState)
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  return (
    <main>
      <div id="contactPage" className="container d-flex justify-content-center">
        <div className="section-title">
          <h2>I would love to hear more about your project.</h2>
        </div>
        <form name="sentMessage" validate="true" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  required
                  onChange={handleChange}
                  value={name}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                  value={email}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <textarea
              name="message"
              id="message"
              className="form-control"
              rows="4"
              placeholder="Message"
              required
              onChange={handleChange}
              value={message}
            ></textarea>
          </div>
          <div id="success"></div>
          <div className="text-center">
            <button type="submit" className="btn btn-custom btn-lg">
              {">> Make Better Music Button"}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

