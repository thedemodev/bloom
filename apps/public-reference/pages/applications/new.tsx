import Router from "next/router"
import { Button, ErrorMessage } from "@bloom-housing/ui-components"
import FormsLayout from "../../layouts/forms"
import PageContent from "../../page_content/applications/new.mdx"
import { useForm } from "react-hook-form"
import { AppSubmissionContext } from "../../lib/AppSubmissionContext"
import ApplicationConductor from "../../lib/ApplicationConductor"
import AppSubmissionStep1a from "../../lib/app_submission_steps/AppSubmissionStep1a"
import { useContext } from "react"
import { MultistepProgress } from "@bloom-housing/ui-components"

export default () => {
  const context = useContext(AppSubmissionContext)
  const { application } = context
  const conductor = new ApplicationConductor(application, context)
  const currentPageStep = 1

  /* Form Handler */
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = data => {
    console.log(data)

    const submission = new AppSubmissionStep1a(conductor)
    submission.save(data)

    Router.push("/applications/step2").then(() => window.scrollTo(0, 0))
  }

  const cardClasses = ["p-10", "bg-white", "mb-10", "border", "border-gray-450", "rounded-lg"].join(
    " "
  )

  return (
    <FormsLayout>
      <article className={cardClasses}>
        <h5 className="font-alt-sans text-center mb-5">
          55 TRITON PARK LANE UNITS 510 516 APPLICATION
        </h5>

        <MultistepProgress
          currentPageStep={currentPageStep}
          completedSteps={application.completedStep}
          totalNumberOfSteps={conductor.totalNumberOfSteps()}
        />
      </article>

      <article className={cardClasses}>
        <div className="markdown">
          <PageContent />
        </div>

        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className={"field " + (errors.firstname ? "error" : "")}>
              <label htmlFor="firstname">First Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="firstname"
                  name="firstname"
                  defaultValue={context.application.name?.split(" ")[0]}
                  ref={register({ required: true })}
                />
              </div>
              <ErrorMessage error={errors.firstname}>Please enter a First Name</ErrorMessage>
            </div>

            <div className={"field " + (errors.lastname ? "error" : "")}>
              <label htmlFor="lastname">Last Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="lastname"
                  name="lastname"
                  defaultValue={context.application.name?.split(" ")[1]}
                  ref={register({ required: true })}
                />
              </div>
              <ErrorMessage error={errors.lastname}>Please enter a Last Name</ErrorMessage>
            </div>
          </div>

          <div className={"field " + (errors.age ? "error" : "")}>
            <label className="label" htmlFor="age">
              Age
            </label>
            <div className="control" style={{ maxWidth: "8rem" }}>
              <input
                className="input"
                type="text"
                id="age"
                name="age"
                defaultValue={context.application.age}
                ref={register({ required: true, pattern: /\d+/ })}
              />
            </div>
            <ErrorMessage error={errors.age}>Please enter number for Age</ErrorMessage>
          </div>

          <div className="field">
            <input
              type="checkbox"
              id="liveInSF"
              name="liveInSF"
              defaultChecked={context.application.liveInSF}
              ref={register}
            />
            <label htmlFor="liveInSF">Live and Work in San Francisco</label>
          </div>

          <div className="field field--inline">
            <input
              type="radio"
              id="housingStatus1"
              name="housingStatus"
              value="permanent"
              defaultChecked={context.application.housingStatus == "permanent"}
              ref={register}
            />
            <label htmlFor="housingStatus1">Permanent Housing</label>
          </div>
          <div className="field field--inline">
            <input
              type="radio"
              id="housingStatus2"
              name="housingStatus"
              value="temporary"
              defaultChecked={context.application.housingStatus == "temporary"}
              ref={register}
            />
            <label htmlFor="housingStatus2">Temporary Housing</label>
          </div>

          <div className="text-center mt-6">
            <Button
              filled={true}
              onClick={() => {
                console.info("button has been clicked!")
              }}
            >
              Next
            </Button>
          </div>
        </form>
      </article>
    </FormsLayout>
  )
}