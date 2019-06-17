import React from 'react'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitWarning: false,
      ...props.fieldValues
    }
  }

  onSubmitHandler = event => {
    // checks that required fields are filled in before allowing submit
    event.preventDefault()

    let fieldIncomplete = false

    // check that all required fields have values
    for (let i = 0; i < this.props.fields.length; i++) {
      let field = this.props.fields[i]
      if (field.required && !this.props.fieldValues[field.id]) {
        fieldIncomplete = true
        break
      }
    }
    if (!fieldIncomplete) {
      // if all required fields are complete
      // call the custom submitHandler
      this.props.onSubmitHandler()
    } else {
      this.setState({
        submitWarning: true
      })
    }
  }

  render() {
    return (
      <section className="form-container">
        <h3 className="form-title">{this.props.title}</h3>
        <form onSubmit={this.onSubmitHandler}>
          {this.props.fields.map((field, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="form-field-container">
                <div className="form-field">
                  <label htmlFor={field.id}>
                    {field.name}
                    {field.required && <abbr title="required">*</abbr>}:
                  </label>
                  <input
                    name={field.name}
                    id={field.id}
                    type={field.type ? field.type : 'text'}
                    onChange={this.props.onChangeHandler}
                    value={this.props.fieldValues[field.id]}
                    onBlur={() => {
                      // if it's a required field display warning once the field has gotten focus
                      this.setState({
                        [field.id]: field.required
                      })
                    }}
                  />
                </div>
                {//if theres nothing inputed and its a required field that has had the user focus on it
                !this.props.fieldValues[field.id] &&
                  this.state[field.id] && (
                    <span className="warning">required</span>
                  )}
              </div>
            )
          })}
          <button type="submit">Submit</button>
        </form>
        {this.state.submitWarning && (
          <div className="warning">
            Please complete all required fields before submitting
          </div>
        )}
      </section>
    )
  }
}

export default Form
