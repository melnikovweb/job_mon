export const updateFormSelected = () => {
    const queryString = window.location.search;
    if(!queryString) return;
    
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('type');
    const office = urlParams.get('office');
    const professionalArea = urlParams.get('professional_area');

    [type, office, professionalArea].forEach(item => {
        const select = document.querySelector(`option[value="${item}"]`);
        select?.parentNode.options.forEach(gfSelect => {
            if(gfSelect.value === item) {
                gfSelect?.setAttribute('selected', 'selected');
            } else {
                gfSelect.removeAttribute('selected');
            }
        });
    });
}