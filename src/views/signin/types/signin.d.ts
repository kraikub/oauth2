interface SteperProps {
  next: () => void
  back: () => void
}
type SignInMethodType = "credential" | "nontri" | "kraikubid" | "otp"