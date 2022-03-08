import { GameStats } from '../../lib/localStorage'
import { solution } from '../../lib/words'
import { BaseModal } from './BaseModal'
import data from '../../constants/tiplist.json'
import wikipediaPages from '../../constants/wikipedialist.json'
import { TIPS_TITLE } from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
}

export const TipsModal = ({ isOpen, handleClose }: Props) => {
  let gene_cards = `https://www.genecards.org/cgi-bin/carddisp.pl?gene=${solution.replace(
    '-',
    ''
  )}`

  let tip = data[solution]
  let wikipediaPage = wikipediaPages[solution]

  return (
    <BaseModal title={TIPS_TITLE} isOpen={isOpen} handleClose={handleClose}>
      <br />
      <br />
      <p>The Gene of the Day {tip}</p>
      <br />
      <br />
      <a
        className="text-lg font-medium  dark:text-gray-100 text-green-600 hover:text-yellow-600"
        target="_blank"
        rel="noreferrer"
        href={wikipediaPage}
      >
        {' '}
        Read about the gene of the day on Wikipedia
      </a>
      <br />
      <br />
      <a
        className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 text-green-600 hover:text-yellow-600"
        target="_blank"
        rel="noreferrer"
        href={gene_cards}
      >
        {' '}
        Read about the gene of the day on Gene Cards
      </a>
      <br />
      <br />
    </BaseModal>
  )
}
