import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Use <a href="https://www.genenames.org/">genenames.org</a> to find suggestions.
        Genes with less than 5 characters are extended with "-".
      </p>
      <div className="flex justify-center mb-1 mt-4">
      <Cell value="I" />
        <Cell value="N" />
        <Cell value="G" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="3"
          status="correct"
        />
               <Cell
          isRevealing={true}
          isCompleted={true}
          value="-"
          status="correct"
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The symbols 3 and - are in the gene and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="N" />
        <Cell value="L" />
        <Cell value="R" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="P"
          status="present"
        />
        <Cell value="1" />

      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The symbol P 3 is in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="G" />
        <Cell value="R" />
        <Cell isRevealing={true} isCompleted={true} value="N" status="absent" />
        <Cell value="-" />
        <Cell value="-" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The symbol N is not in the word in any spot.
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This is a modification of an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/lubianat/react-wordle"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
