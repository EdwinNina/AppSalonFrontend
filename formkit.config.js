import { generateClasses } from '@formkit/themes'

const config = {
   config: {
      classes: generateClasses({
         global: {
            wrapper: 'space-y-2 mb-3',
            message: 'text-red-500 text-sm fopnt-bold uppercase my-5',
            label: 'block mb-1 text-white font-bold text-lg',
            input: 'w-full p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400'
         },
         submit: {
            input: '$reset bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold w-full p-3 mt-10'
         }
      })
   }
}

export default config