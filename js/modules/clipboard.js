async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}

export function initCopyCommand() {
  const ctaBtn = document.getElementById('cta-copy-btn');
  if (!ctaBtn) return;

  ctaBtn.addEventListener('click', async () => {
    const command = 'npx create-react-native-tui';
    const copyBtn = document.getElementById('copy-text');
    const originalText = copyBtn.textContent;

    try {
      await copyToClipboard(command);

      copyBtn.textContent = '✓ Copied to clipboard!';
      copyBtn.parentElement.classList.add('btn-success');

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.parentElement.classList.remove('btn-success');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);

      copyBtn.textContent = '✗ Failed to copy';

      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    }
  });
}

export function initCopyLineButtons() {
  document.querySelectorAll('.copy-line-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const codeRow = btn.closest('.code-row');
      const code = codeRow.querySelector('code').textContent;

      try {
        await copyToClipboard(code);
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '✓';
        btn.classList.add('success');

        setTimeout(() => {
          btn.innerHTML = originalIcon;
          btn.classList.remove('success');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
}

export function initCopyStepButtons() {
  document.querySelectorAll('.copy-step-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.getAttribute('data-code');

      try {
        await copyToClipboard(code);
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '✓';
        btn.classList.add('success');

        setTimeout(() => {
          btn.innerHTML = originalIcon;
          btn.classList.remove('success');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
}

export function initCodeCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach(block => {
    const wrapper = block.closest('.hero-code, .example-content');
    if (wrapper && !wrapper.querySelector('.code-copy-btn')) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.innerHTML = '📋';
      copyBtn.title = 'Copy code';

      copyBtn.addEventListener('click', async () => {
        const code = block.textContent;
        try {
          await copyToClipboard(code);
          copyBtn.innerHTML = '✓';
          setTimeout(() => {
            copyBtn.innerHTML = '📋';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      });

      wrapper.style.position = 'relative';
      wrapper.appendChild(copyBtn);
    }
  });
}
