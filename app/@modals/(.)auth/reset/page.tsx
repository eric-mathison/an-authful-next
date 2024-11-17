"use client"
import { Modal } from "@/components/modal"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { ModalContext } from "@/lib/providers/modal"

export default function LoginModal() {
  return (
    <ModalContext.Provider value={{ isModal: true }}>
      <Modal>
        <CardWrapper
          title="Password Reset"
          headerLabel="Forgot your password?"
          backButtonLabel="Back to login"
          backButtonHref="/login"
        >
          <ResetPasswordForm />
        </CardWrapper>
      </Modal>
    </ModalContext.Provider>
  )
}
