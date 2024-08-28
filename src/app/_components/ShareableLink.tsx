import { useState } from 'react';
import { Button } from './ui/button';

interface ShareableLinkProps {
  favorites: any[];
  onGenerate: () => void;
  link: string | null;
}

const ShareableLink: React.FC<ShareableLinkProps> = ({ favorites, onGenerate, link }) => {
  const [copied, setCopied] = useState(false);

  const handleButtonClick = () => {
    if (!link) {
      onGenerate();
    } else {
      navigator.clipboard.writeText(link).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch((err) => console.error('Failed to copy link: ', err));
    }
  };

  return (
    <div className="flex justify-center items-center mb-4">
      <Button
        onClick={handleButtonClick}
        className="px-4 py-2 rounded"
      >
        {!link ? 'Gerar link para compartilhar' : copied ? 'Link copiado!' : 'Copiar link'}
      </Button>
    </div>
  );
};

export default ShareableLink;
