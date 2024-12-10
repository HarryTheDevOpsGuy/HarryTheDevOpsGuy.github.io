// document.getElementById("header").innerHTML = document.querySelector("header").innerHTML;
// document.getElementById("footer").innerHTML = document.querySelector("footer").innerHTML;


$(document).ready(function() {

    // Function to get the value of 'id' from the URL
    // function getParams(params) {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     return urlParams.get(params);
    // }
  


    function showMessage(message) { 
        $('#successMessage').text(message).fadeIn().delay(2000).fadeOut(); 
    }


    // Create new resume with unique ID
    $('#newResume').click(function() {
        const newResumeId = 'resume-' + Date.now();
        const newResumeContent = '<h3 id="name" class="text-primary">New Resume</h3><p id="title">Your Title Here</p><div class="row"><div class="col-sm-6"><h5>Technical Skills</h5><ul><li>Skill 1</li><li>Skill 2</li><li>Skill 3</li></ul></div><div class="col-sm-6"><h5>Work Experience</h5><p><strong>Your Position</strong> at Company (Year - Year)</p></div></div>';
        $('#resume').attr('data-id', newResumeId).html(newResumeContent);
        highlightActiveResume();
    });

    $('.select-btn').click(function() {
        const rawContent = $(this).closest('.carousel-item').find('.resume-body').clone();
        rawContent.find('.hide-code').remove();
        const resumeContent = rawContent.html();
        const resumeName = $(this).closest('.carousel-item').find('#name').text();
        const resumeId = 'resume-' + Date.now();
        const savedResumes = localStorage.getItem('savedResumes') ? JSON.parse(localStorage.getItem('savedResumes')) : [];
        const existingIndex = savedResumes.findIndex(resume => resume.id === resumeId);
        if (existingIndex !== -1) {
            savedResumes[existingIndex] = { id: resumeId, name: 'tmpl - ' + resumeName, content: resumeContent };
        } else {
            savedResumes.push({ id: resumeId, name: resumeName, content: resumeContent });
        }

        localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
        window.location.href = 'resume-editor.html';
    });


    $('#saveResume').click(function() {
        const resumeContent = $('#resume').html();
        const resumeName = $('#name').text();
        const resumeTitle = $('#title').text() || 'cv-builder';
        const resumeId = $('#resume').attr('data-id') || 'resume-' + Date.now();
        const resumeUrl = window.location.origin + window.location.pathname;
        const savedResumes = localStorage.getItem('savedResumes') ? JSON.parse(localStorage.getItem('savedResumes')) : [];
    
        const existingIndex = savedResumes.findIndex(resume => resume.id === resumeId);
        if (existingIndex !== -1) {
            savedResumes[existingIndex] = { id: resumeId, name: resumeName, title: resumeTitle, content: resumeContent , url: resumeUrl, default: savedResumes[existingIndex].default };      
        } else {
            savedResumes.push({ id: resumeId, name: resumeName, title: resumeTitle, content: resumeContent, url: resumeUrl, default: false });
        }
    
        localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
        showMessage('Resume saved successfully!');
        markAsDefault(resumeId);
        loadSavedResumes();
        editResume(resumeId);
        
    });
    
    // make resume as default 
    function markAsDefault(resumeId) {
        const savedResumes = JSON.parse(localStorage.getItem('savedResumes')) || [];
        savedResumes.forEach(resume => resume.default = (resume.id === resumeId));
        localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
        loadSavedResumes();
    }

    // load resume in saved list on ui 
    function loadSavedResumes() {
        // const savedResumes = JSON.parse(localStorage.getItem('savedResumes')) || [];
        const savedResumes = localStorage.getItem('savedResumes') ? JSON.parse(localStorage.getItem('savedResumes')) : [];
        $('#saved-resumes').empty();
    
        savedResumes.forEach((resume, index) => {           
            // const defaultResume = resume.default ? ' (Default)' : '';
            const defaultResumeClass =  resume.default ? 'default-resume' : '';             
            const resumeHtml = `
                <div class="saved-resume ${defaultResumeClass}">
                    <img height="150" src="/cv/assets/img/logo.png" alt="Resume-Logo"/>
                    <h4>${resume.name}</h4>
                    <p>${resume.title}</p>
                    <i class="fas fa-edit action-btn" onclick="editResume('${index}')" title="Edit"></i>
                    <i class="fas fa-trash action-btn" onclick="deleteResume('${index}')" title="Delete"></i>
                </div>
            `;

            $('#saved-resumes').append(resumeHtml);

            //  To load default resume in editor 
            if (resume.url === window.location.href && resume.default ) {
                $('#resume').attr('data-id', resume.id).html(resume.content);
            }

        }); 

    }
    



    // Edit resume
    window.editResume = function(index) {
        const savedResumes = localStorage.getItem('savedResumes') ? JSON.parse(localStorage.getItem('savedResumes')) : [];
        const resume = savedResumes[index];
        markAsDefault(resume.id);
        if (resume.url !== window.location.href ) {
            window.location.href = resume.url;
        } else { 
            // Load resume content if URL matches 
            $('#resume').attr('data-id', resume.id).html(resume.content);
            highlightActiveResume();
        }    
    };

      // load resume for edit by query params
        // const resumeid = getParams('id');
        // if (resumeid) { 
        //     editResume(resumeid); 
        // }

    // Delete resume
    window.deleteResume = function(index) {
        let savedResumes = localStorage.getItem('savedResumes') ? JSON.parse(localStorage.getItem('savedResumes')) : [];
        savedResumes.splice(index, 1);
        localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
        loadSavedResumes();
    };

    // Copy resume to Base64
    $('#copyResumeBase64').click(function() {
        const resumeContent = $('#resume').html();
        const resumeBase64 = btoa(unescape(encodeURIComponent(resumeContent)));
        navigator.clipboard.writeText(resumeBase64).then(function() {
            // $('#successMessage').fadeIn().delay(2000).fadeOut();
            showMessage('Copied encodeded data');
        });
    });

    // Paste resume from Base64
    $('#pasteResumeBase64').click(function() {
        navigator.clipboard.readText().then(function(text) {
            const resumeContent = decodeURIComponent(escape(atob(text)));
            $('#resume').html(resumeContent);
            showMessage('Pasted encodeded data');
            $('#saveResume').click();
        });
    });

    // Highlight active resume
    function highlightActiveResume() {
        const resumeId = $('#resume').attr('data-id');
        $('.resume-item').removeClass('active-resume');
        $(`.resume-item[data-id="${resumeId}"]`).addClass('active-resume');
    }

    // Set font size for all elements under #resume based on percentage
    function setFontSize(fontSizePercentage) {
        $('#resume').find('*').each(function() {
            const originalFontSize = $(this).data('original-font-size');
            if (!originalFontSize) {
                const currentFontSize = parseFloat($(this).css('font-size').replace('px', ''));
                $(this).data('original-font-size', currentFontSize);
            }
            const newFontSize = $(this).data('original-font-size') * (fontSizePercentage / 100);
            $(this).css('font-size', newFontSize + 'px');
        });
    }

    // Manual font size adjustment using scroller
    $('#fontSizeControl').on('input', function() {
        const fontSize = $(this).val();
        setFontSize(fontSize);
        showMessage(fontSize + '%');
        // $('#fontSizeValue').text(fontSize + '%');
    });

    // Smooth scrolling for internal links
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000);
        }
    });

    // Initial load of saved resumes
    loadSavedResumes();
});
