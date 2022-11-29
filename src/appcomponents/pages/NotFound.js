export default function NotFound(){
    const _htmlFile = require('../../static/NotFoundPage')
    const style = require('../../static/NotFound.css')
    const template = {__html:_htmlFile};
 return (
         <div  style={style} dangerouslySetInnerHTML={template} />
 )
}