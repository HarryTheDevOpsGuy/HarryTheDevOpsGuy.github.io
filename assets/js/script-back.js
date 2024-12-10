// document.getElementById("header").innerHTML = document.querySelector("header").innerHTML;
// document.getElementById("footer").innerHTML = document.querySelector("footer").innerHTML;
$(document).ready(function() {
    // const resumeid = $('#resume').attr('resumeid');
    const resumeid = 'selectedResume';
    const initialData = $('#resume').html();

    // Function to save resume data to local storage
    $('#saveResume').on('click', function() {
        const resumeData = $('#resume').html();
        localStorage.setItem(resumeid, resumeData);
        alert('Resume saved!');
    });

    // Function to clear resume data from local storage and reload the div
    $('#clearResume').on('click', function() {
        localStorage.removeItem(resumeid);
        $('#resume').html(initialData);
        alert('Resume data cleared and reset!');
        const fontSizeInput = document.getElementById('fontSizeControl');
        adjustFontSize(fontSizeInput.value);
    });

    // Function to copy resume data as Base64
    $('#copyResume').on('click', function() {
        const resumeData = $('#resume').html();
        const base64Data = btoa(unescape(encodeURIComponent(resumeData)));
        navigator.clipboard.writeText(base64Data).then(() => {
            $('#successMessage').fadeIn().delay(5000).fadeOut();
        }).catch(err => {
            alert('Failed to copy resume data: ' + err);
        });
    });

    // Function to paste resume data from clipboard and load it
    $('#pasteResume').on('click', async function() {
        try {
            const text = await navigator.clipboard.readText();
            const resumeData = decodeURIComponent(escape(atob(text)));
            $('#resume').html(resumeData);
            alert('Resume data pasted from clipboard!');
            const fontSizeInput = document.getElementById('fontSizeControl');
            adjustFontSize(fontSizeInput.value);
        } catch (err) {
            alert('Failed to paste resume data from clipboard: ' + err);
        }
    });

    // Function to send resume data to WhatsApp
    $('#sendWhatsApp').on('click', function() {
        const resumeData = $('#resume').html();
        const base64Data = btoa(unescape(encodeURIComponent(resumeData)));
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(base64Data)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Automatically load resume data if available
    // const storedData = localStorage.getItem(resumeid);
    // if (storedData) {
    //     $('#resume').html(storedData);
    //     $('#resume').find('.select-btn').remove();
    //     const fontSizeInput = document.getElementById('fontSizeControl');
    //     adjustFontSize(fontSizeInput.value);
    // }

    // Automatically load resume data if available
    let selectedResumeId = localStorage.getItem('selectedResumeId');
    if (selectedResumeId) {
        let savedResume = JSON.parse(localStorage.getItem('resume_' + selectedResumeId));
        if (savedResume) {
            $('.resume-info').html(savedResume.info);
            $('#resume').html(savedResume.body);
            $('#resume').find('.select-btn').remove(); // Remove the select button from resume body
            const fontSizeInput = document.getElementById('fontSizeControl');
            adjustFontSize(fontSizeInput.value);
        }
    }


    // Update the displayed font size value
    $('#fontSizeControl').on('input', function() {
        $('#fontSizeValue').text(`${this.value}%`);
    });

    // Select resume and edit in new page.
    // $('.select-btn').click(function() {
    //     // let resumeData = $(this).closest('.resume-container').html();
    //     let resumeData = $(this).closest('.carousel-item').html();
    //     // localStorage.removeItem(resumeid);
    //     localStorage.setItem(resumeid, resumeData);
    //     window.location.href = 'edit.html'; 
    // });

    // Select resume and edit in new page.
    $('.select-btn').click(function() {
        let $carouselItem = $(this).closest('.carousel-item');
        let resumeId = $carouselItem.data('resumeid');
        let resumeInfo = $carouselItem.find('.resume-info').html();
        let resumeBody = $carouselItem.find('.resume-body').html();
        let resumeData = {
            info: resumeInfo,
            body: resumeBody
        };
        localStorage.setItem('resume_' + resumeId, JSON.stringify(resumeData));
        localStorage.setItem('selectedResumeId', resumeId);
        window.location.href = 'edit.html';
    });

    function loadSavedResumes() {
        $('#savedResumes').empty();
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith('resume_')) {
                let resumeId = key.split('_')[1];
                let resumeData = JSON.parse(localStorage.getItem(key));
                let resumeTitle = $('#name').text();
                $('#savedResumes').append(`
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        <span>resume_${resumeId} ${resumeTitle}</span>
                        <div>
                            <button class="btn btn-primary view-resume" data-resumeid="${resumeId}"><i class="fas fa-eye"></i> View</button>
                            <button class="btn btn-secondary edit-resume" data-resumeid="${resumeId}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="btn btn-danger delete-resume" data-resumeid="${resumeId}"><i class="fas fa-trash"></i> Delete</button>
                        </div>
                    </div>
                `);
            }
        }

        $('.view-resume').click(function() {
            let resumeId = $(this).data('resumeid');
            let resumeData = JSON.parse(localStorage.getItem('resume_' + resumeId));
            alert('Resume Info:\n' + resumeData.info + '\n\nResume Body:\n' + resumeData.body);
        });

        $('.edit-resume').click(function() {
            let resumeId = $(this).data('resumeid');
            localStorage.setItem('selectedResumeId', resumeId);
            window.location.href = 'edit.html';
        });

        $('.delete-resume').click(function() {
            let resumeId = $(this).data('resumeid');
            localStorage.removeItem('resume_' + resumeId);
            loadSavedResumes();
        });
    }

    loadSavedResumes();
    

});