/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "seal": "persimmon",
  "density": "full",
  "grain": true,
  "showRecognition": false
}/*EDITMODE-END*/;

const SEAL_HEX = {
  persimmon: '#A04A30',
  bengara:   '#8C3A2B',
  indigo:    '#2E4A62',
  matcha:    '#5F6B43',
  sumi:      '#46413A'
};

function applyTweaks(t) {
  const stage = document.querySelector('deck-stage');
  if (!stage) return;
  stage.setAttribute('data-seal', t.seal);
  stage.setAttribute('data-density', t.density);
  stage.style.setProperty('--grain', t.grain ? '1' : '0');
  const rec = stage.querySelector('[data-slide="recognition"]');
  if (rec) {
    if (t.showRecognition) rec.removeAttribute('data-deck-skip');
    else rec.setAttribute('data-deck-skip', '');
  }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Seal" />
      <TweakColor
        label="Accent"
        value={SEAL_HEX[t.seal]}
        options={['#A04A30', '#8C3A2B', '#2E4A62', '#5F6B43', '#46413A']}
        onChange={(hex) => {
          const key = Object.keys(SEAL_HEX).find((k) => SEAL_HEX[k] === hex) || 'persimmon';
          setTweak('seal', key);
        }}
      />
      <TweakSection label="Paper" />
      <TweakToggle label="Paper grain" value={t.grain} onChange={(v) => setTweak('grain', v)} />
      <TweakSection label="Content" />
      <TweakRadio
        label="Detail"
        value={t.density}
        options={['full', 'lean']}
        onChange={(v) => setTweak('density', v)}
      />
      <TweakToggle
        label="Recognition slide"
        value={t.showRecognition}
        onChange={(v) => setTweak('showRecognition', v)}
      />
    </TweaksPanel>
  );
}

const mount = document.createElement('div');
document.body.appendChild(mount);
ReactDOM.createRoot(mount).render(<App />);
