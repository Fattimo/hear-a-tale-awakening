import tutorial_1 from 'public/images/tutorial/bookmarking/1.png'
import tutorial_2 from 'public/images/tutorial/bookmarking/2.png'
import ImageViewer from 'src/components/Help/ImageViewer'

const Help = () => {
  const PAGES = [tutorial_1, tutorial_2]
  return ImageViewer({ images: PAGES })
}

export default Help
