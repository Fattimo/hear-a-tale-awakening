import tutorial_1 from 'public/images/tutorial/quizzing/1.png'
import tutorial_2 from 'public/images/tutorial/quizzing/2.png'
import tutorial_3 from 'public/images/tutorial/quizzing/3.png'
import ImageViewer from 'src/components/Help/ImageViewer'

const Help = () => {
  const PAGES = [tutorial_1, tutorial_2, tutorial_3]
  return ImageViewer({ images: PAGES })
}

export default Help
