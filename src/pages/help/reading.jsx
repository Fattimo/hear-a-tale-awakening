import tutorial_1 from 'public/images/tutorial/reading/tutorial_1.png'
import tutorial_2 from 'public/images/tutorial/reading/tutorial_2.png'
import tutorial_3 from 'public/images/tutorial/reading/tutorial_3.png'
import tutorial_4 from 'public/images/tutorial/reading/tutorial_4.png'
import tutorial_5 from 'public/images/tutorial/reading/tutorial_5.png'
import ImageViewer from 'src/components/Help/ImageViewer'

const Help = () => {
  const PAGES = [tutorial_1, tutorial_2, tutorial_3, tutorial_4, tutorial_5]
  return ImageViewer({ images: PAGES })
}

export default Help
