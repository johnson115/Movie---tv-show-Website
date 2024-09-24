import React, { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  TextField, 
  Box, 
  Typography,
  IconButton,
  Grow,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/system';
import {  CircleCheckBig, CircleX, MailWarning } from 'lucide-react';

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: 15,
    boxShadow: '0 8px 40px rgba(255,215,0,0.3)',
    background: 'linear-gradient(145deg, #1a1a1a 0%, #000000 100%)',
    color: '#ffffff',
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  background: 'linear-gradient(90deg, #ffd700 0%, #ffcc00 100%)',
  color: '#000000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 24px',
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    '& fieldset': {
      borderColor: '#ffd700',
    },
    '&:hover fieldset': {
      borderColor: '#ffcc00',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffcc00',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#ffd700',
  },
});

const AnimatedButton = styled(Button)({
  transition: 'all 0.3s ease-in-out',
  backgroundColor: '#ffd700',
  color: '#000000',
  '&:hover': {
    backgroundColor: '#ffcc00',
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
  },
});

export default function FeedbackModal() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '9fdec94d-fcad-4d40-8d13-21e0b12728c2',
          name,
          email,
          message: feedback
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
        setTimeout(() => setOpen(false), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledDialog 
      open={open} 
      onClose={() => setOpen(false)} 
      aria-labelledby="feedback-dialog-title"
      fullScreen={fullScreen}
      TransitionComponent={Grow}
      TransitionProps={{ timeout: 500 }}
    >
      <StyledDialogTitle id="feedback-dialog-title">
        <Box display="flex" alignItems="center">
          <MailWarning style={{ marginRight: '8px', color: '#000000' }} />
          We Need Your Feedback!
        </Box>
        <IconButton 
          edge="end" 
          onClick={() => setOpen(false)} 
          aria-label="close"
          sx={{ color: '#000000' }}
        >
          <CircleX />
        </IconButton>
      </StyledDialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText style={{ marginBottom: '20px', color: '#ffd700' }}>
            Help us improve by sharing your thoughts. Your feedback is valuable to us!
          </DialogContentText>
          <StyledTextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <StyledTextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledTextField
            margin="dense"
            id="feedback"
            label="Feedback"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions style={{ padding: '16px 24px' }}>
          <AnimatedButton onClick={() => setOpen(false)}>
            Cancel
          </AnimatedButton>
          <AnimatedButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Feedback'}
          </AnimatedButton>
        </DialogActions>
      </form>
      {submitStatus === 'success' && (
        <Box display="flex" alignItems="center" p={2} bgcolor="#1a1a1a" borderRadius="0 0 15px 15px">
          <CircleCheckBig color="#ffd700" style={{ marginRight: '8px' }} />
          <Typography color="#ffd700">Feedback sent successfully!</Typography>
        </Box>
      )}
      {submitStatus === 'error' && (
        <Box display="flex" alignItems="center" p={2} bgcolor="#1a1a1a" borderRadius="0 0 15px 15px">
          <CircleX color="#ff6b6b" style={{ marginRight: '8px' }} />
          <Typography color="#ff6b6b">Failed to send feedback. Please try again.</Typography>
        </Box>
      )}
    </StyledDialog>
  );
}