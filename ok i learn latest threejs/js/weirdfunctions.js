function toggledebug(){
    if (document.getElementById('controlpanel').style.display=='none'){
      document.getElementById('controlpanel').style.display='block'
      document.getElementById('buttondbg').innerHTML = ''
    }
    else{document.getElementById('controlpanel').style.display='none'; document.getElementById('buttondbg').innerHTML = '.'}
   
  }