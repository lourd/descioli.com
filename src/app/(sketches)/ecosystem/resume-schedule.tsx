"use client"

import { useOptimistic, ViewTransition } from "react"

import classes from "./classes.module.css"

export function ResumeSchedule(props: {
  isHidden: boolean
  authenticated: boolean
  resumeScheduleAction: () => Promise<void>
  children: React.ReactNode
}) {
  const [isHidden, setHidden] = useOptimistic(props.isHidden)
  return (
    <div className={`${classes.tempBar} flex flex-row items-center text-sm`}>
      {(() => {
        if (isHidden) {
          return null
        }

        return (
          <ViewTransition>
            {props.children}
            {props.authenticated && (
              <form
                action={() => {
                  setHidden(true)
                  return props.resumeScheduleAction()
                }}
                className="ml-2"
              >
                <button className="px-2 py-0 rounded-sm bg-gray-200 dark:bg-gray-700 whitespace-nowrap">
                  Resume schedule
                </button>
              </form>
            )}
          </ViewTransition>
        )
      })()}
    </div>
  )
}
