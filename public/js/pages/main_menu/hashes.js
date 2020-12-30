if (location.hash.substring(1) == "multiplayer") {
    openMultiplayerMenu()
} else if (location.hash.substring(1) == "statistics") {
    openStatistics()
} else if (location.hash.substring(1) == "how-to-play") {
    openHowToPlay()
} else if (location.hash.substring(1) == "credits") {
    openCredits()
} else {
    openMainMenu()
}