import * as React from "react"
import moment from "moment"
import t from "@bloom-housing/ui-components/src/helpers/translator"
import { Listing } from "@bloom-housing/core"
import { openDateState } from "../helpers/state"
import Icon from "../atoms/Icon"

export interface ApplicationStatusProps {
  listing: Listing
  vivid?: boolean
}

const ApplicationStatus = (props: ApplicationStatusProps) => {
  let content = ""
  let formattedDate = ""
  let bgColor = ""
  const listing = props.listing

  // determine styling
  const vivid = props.vivid || false
  const textColor = vivid ? "text-white" : "text-gray-800"
  const textSize = vivid ? "text-xs" : "text-sm"

  if (openDateState(listing)) {
    const date = listing.applicationOpenDate
    const openDate = moment(date)
    //  from [Application Open Date] to [Application Due Date]
    if (!vivid && listing.applicationDueDate != "") {
      formattedDate = t("t.range", {
        from: openDate.format("MMMM D, YYYY"),
        to: moment(listing.applicationDueDate).format("MMMM D, YYYY"),
      })
    } else {
      formattedDate = openDate.format("MMMM D, YYYY")
    }

    bgColor = vivid ? "bg-primary" : "bg-primary-light"
    content = vivid ? t("listings.comingSoon") : t("listings.applicationOpenPeriod")
  } else {
    const date = listing.applicationDueDate
    const dueDate = moment(date)
    formattedDate = dueDate.format("MMM DD, YYYY") + " at " + dueDate.format("h:mm A")

    // if due date is in future, listing is open
    if (moment() < dueDate) {
      bgColor = vivid ? "bg-primary" : "bg-primary-light"
      content = t("listings.applicationDeadline")
    } else {
      bgColor = vivid ? "bg-alert" : "bg-alert-light"
      content = t("listings.applicationsClosed")
    }
  }

  return (
    <div className={`application-status ${textSize} p-4 ${textColor} ${bgColor}`}>
      <Icon size="medium" symbol="clock" white={vivid} /> &nbsp;
      {content}: {formattedDate}
    </div>
  )
}

export { ApplicationStatus as default, ApplicationStatus }
