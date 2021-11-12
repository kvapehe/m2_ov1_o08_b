/**
 * Siden det er lite variasjon med temperatursensor så kan en istedenfor å multiplisere et tall med en faktor overføre den til en annen skala med map-funksjonen.
 * 
 * Valgte verdier her gir frekvensen 20 Hz ved -5 grader, ca 950 Hz ved 15 grader som fortsatt er kladt
 * 
 * og opp til 1480 Hz ved 27 grader, som begynner å bli varmt. Maks verdi er 2550 Hz
 * 
 * Variablene sensorverdi_raw og sensorverdi_map viser disse verdiene.
 * 
 * A og B - tastene brukes til å bytte mellom to visninger.
 */
input.onButtonPressed(Button.A, function () {
    debug = 0
})
input.onButtonPressed(Button.B, function () {
    debug = 1
})
let sensorverdi_map = 0
let sensorverdi_raw = 0
let debug = 0
debug = 0
basic.forever(function () {
    sensorverdi_raw = input.temperature()
    sensorverdi_map = Math.map(sensorverdi_raw, -5, 50, 20, 2550)
    if (debug == 0) {
        // Erstatter vising av tall.
        // Verdier temperatur er fra -0 - 50 der varmest er 50.Dette gjøres om fra -5 til 50 og benytter 20 - 2550  Dette kan vises som 0% - 100%. 
        // Denne testen viser verdier mellom 950 Hz og 1480 Hz som Middels temperatur.
        // Verdien 950 er ca. 15degC og verdien 1480 er ca. 27 degC 
        // Alt under 950  er K (Kaldt).
        // En tone vil "speile" temperatur med en frekvens.
        // A input viser symboler og spiller tone
        // B input viser temperaturverdien omgjort til Hz og spiller tone.
        if (sensorverdi_map > 1480) {
            basic.showLeds(`
                # . . . #
                # . . . #
                # . . . #
                . # . # .
                . . # . .
                `)
        } else if (sensorverdi_map > 950) {
            basic.showLeds(`
                # . # . #
                # # # . .
                # . # . #
                # . # . #
                # . # . #
                `)
        } else {
            basic.showLeds(`
                # . . # .
                # . # . .
                # # . . .
                # . # . .
                # . . # .
                `)
        }
    } else {
        // Microbit kan kun vise et tall / tegn av gange, men å vise tal med f.eks. tone er en metode som ofte brukes for å vise et tall. Avstandssenorer kan blant annet bruke slik varsling. Bytt gjerne ut _raw med _map. Da kan en se verdiene som er benyttet i IF-testene
        basic.showNumber(sensorverdi_map)
    }
    music.playTone(sensorverdi_map, music.beat(BeatFraction.Sixteenth))
})
